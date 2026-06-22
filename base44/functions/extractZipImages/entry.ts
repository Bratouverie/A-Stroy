import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import JSZip from 'npm:jszip@3.10.1';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { zipUrl, prefix } = await req.json();
    
    if (!zipUrl) {
      return Response.json({ error: 'zipUrl required' }, { status: 400 });
    }

    const response = await fetch(zipUrl);
    if (!response.ok) {
      return Response.json({ error: 'Failed to fetch zip' }, { status: 500 });
    }
    
    const buffer = await response.arrayBuffer();
    const zip = await JSZip.loadAsync(buffer);
    
    const imageFiles = [];
    const entries = Object.keys(zip.files).filter(f => {
      if (zip.files[f].dir) return false;
      const lower = f.toLowerCase();
      // Skip macOS system files
      if (lower.includes('__macosx') || lower.includes('.ds_store')) return false;
      return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.webp');
    });
    
    entries.sort();
    
    // Upload images using the raw upload endpoint
    const appId = Deno.env.get("BASE44_APP_ID");
    
    for (const entry of entries) {
      const file = zip.files[entry];
      const uint8 = await file.async('uint8array');
      
      const ext = entry.split('.').pop().toLowerCase();
      const mimeMap = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
      const mime = mimeMap[ext] || 'image/jpeg';
      const fileName = entry.split('/').pop();
      
      const formData = new FormData();
      formData.append('file', new File([uint8], fileName, { type: mime }));
      
      const uploadResult = await base44.integrations.Core.UploadFile({ file: new File([uint8], fileName, { type: mime }) });
      
      imageFiles.push({
        name: fileName,
        url: uploadResult.file_url,
        folder: entry.includes('/') ? entry.substring(0, entry.lastIndexOf('/')) : ''
      });
    }
    
    return Response.json({ 
      images: imageFiles, 
      count: imageFiles.length,
      prefix: prefix || '' 
    });
  } catch (error) {
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
});