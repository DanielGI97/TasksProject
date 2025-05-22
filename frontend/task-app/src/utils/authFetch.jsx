async function refreshToken() {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return null;
  
    try {
      const res = await fetch('/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh })
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('access', data.access);
        return data.access;
      } else {
        console.warn('Refresh token inválido o expirado');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return null;
      }
    } catch (err) {
      console.error('Error al refrescar token:', err);
      return null;
    }
}

export async function authFetch(url, options = {}) {
    let access = localStorage.getItem('access');

    if (!options.headers) {
        options.headers = {};
    }

    options.headers['Authorization'] = `Bearer ${access}`;

    let response = await fetch(url, options);

    if (response.status === 401) {
        // El token puede haber expirado
        const newAccess = await refreshToken();
        if (newAccess) {
        options.headers['Authorization'] = `Bearer ${newAccess}`;
        response = await fetch(url, options);  // reintento
        } else {
        // No se pudo refrescar
        return response;
        }
    }

    return response;
}