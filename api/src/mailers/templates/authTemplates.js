export const verificationTemplate = (name, url) => {
  return `
    <h2 style="color: #2e294e; margin-bottom: 20px;">¡Hola, ${name}!</h2>
    <p>Gracias por unirte a <strong>TuServicio</strong>. Estamos emocionados de tenerte con nosotros.</p>
    <p>Para comenzar a explorar y conectar con confianza, por favor confirma tu dirección de correo haciendo clic en el siguiente botón:</p>
    
    <a href="${url}" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Verificar mi cuenta
          </a>
    
    <p style="font-size: 14px; color: #949498;">
      Si el botón no funciona, puedes copiar y pegar este enlace en tu navegador:<br>
      <a href="${url}" style="color: #1b998b;">${url}</a>
    </p>
    <p>Este enlace expirará en 10 minutos por razones de seguridad.</p>
  `;
};
export const verificationSuccessTemplate = (name, url) => {
  return `

    <div style="padding: 40px 30px;">
      <h2 class="text-main" style="color: #1a1a1a; margin-top: 0; text-align: center; font-size: 24px;">¡Hola, ${name}!
      </h2>
        <p class="text-main" style="color: #444444; line-height: 1.6; font-size: 16px; text-align: center;">
          Tu correo electrónico ha sido verificado correctamente. Ya eres un miembro activo de nuestra comunidad.
        </p>
         
      <div style="text-align: center; margin: 35px 0;">
        <a href="${url}/login" 
        style="background-color: #0070f3; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
        Acceder a mi panel
        </a>
      </div>
      <p class="text-sub" style="color: #888888; font-size: 14px; text-align: center; line-height: 1.4;">
        Si no has sido tú quien ha realizado esta solicitud, por favor ponte en contacto con nuestro equipo de soporte de inmediato.
      </p>
    </div>
  `;
};
export const passwordResetTemplate = (name, url) => {
  return `
    <h2 style="color: #2e294e; margin-bottom: 20px;">Reestablecer Contraseña</h2>
    <p>Hola <strong>${name}</strong>,</p>
    <p>Recibimos una solicitud para cambiar la contraseña de tu cuenta en TuServicio.</p>
    <p>Para continuar, haz clic en el botón a continuación (por razones de seguridad, <strong>este enlace es de un solo uso y válido por 10 minutos</strong>):</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${url}" class="btn" style="color: #ffffff; background-color: #1b998b; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Cambiar mi contraseña
      </a>
    </div>
    
    <p style="font-size: 14px; color: #949498;">
      Si no solicitaste este cambio, puedes ignorar este correo de forma segura. Tu contraseña actual no cambiará.
    </p>
  `;
};
export const passwordResetTemplateSuccess = (name, url) => {
  return `
        <h2 style="color: #2e294e; margin-bottom: 20px;">Reestablecer Contraseña</h2>
    <p>Hola <strong>${name}</strong>,</p>
    <p>Tu solicitud para cambiar la contraseña de tu cuenta en TuServicio ha sido realizada con éxito.</p>
    <p>Para continuar, y acceder a tu cuenta, haz clic en el botón de abajo :</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${url}" class="btn" style="color: #ffffff; background-color: #1b998b; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Ir a iniciar sesión
      </a>
    </div>
    
    <p style="font-size: 14px; color: #949498;">
      Si no solicitaste este cambio, Comunícate con soporte técnico lo antes posible.
    </p>
  `;
};
