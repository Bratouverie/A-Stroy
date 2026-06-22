import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const code = (body.code || '').toUpperCase().trim();

    if (!code) {
      return Response.json({ success: false, message: 'Введите код' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    const users = await base44.asServiceRole.entities.CRMUser.filter({
      secretCode: code,
      isActive: true
    });

    if (users.length === 0) {
      return Response.json({ success: false, message: 'Неверный код доступа' }, { status: 401 });
    }

    const user = users[0];
    return Response.json({
      success: true,
      userId: user.id,
      name: user.name,
      role: user.role
    });
  } catch (error) {
    return Response.json({ success: false, message: 'Ошибка сервера: ' + error.message }, { status: 500 });
  }
});