import { createMiddleware } from '@vercel/edge';

export default createMiddleware(async (request, context) => {
  const authHeader = request.headers.get('authorization');
  
  // Password from environment variable
  const password = process.env.DASHBOARD_PASSWORD;
  
  if (!password) {
    console.warn('DASHBOARD_PASSWORD not set - allowing access');
    return context.next();
  }
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="The List Dashboard"' }
    });
  }
  
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = atob(base64Credentials);
  const [username, providedPassword] = credentials.split(':');
  
  // Accept any username, check password only
  if (providedPassword === password) {
    return context.next();
  }
  
  return new Response('Invalid password', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="The List Dashboard"' }
  });
});

export const config = {
  matcher: ['/', '/index.html', '/daily_tasks.json', '/daily_tasks_dashboard.html'],
};