//Estructura sugerida para tu Layout Base
const logoLight =
  "https://res.cloudinary.com/dkjixw8hv/image/upload/v1768047833/logo-tuserv-light_ba2egj.webp";
const logoDark =
  "https://res.cloudinary.com/dkjixw8hv/image/upload/v1768047833/logo-tuservicio-dark_qrsaup.webp";
  
export const baseLayout = (content) => `
<!DOCTYPE html>
  <html>
  <head>
   <style>
    /* Soporte para Dark Mode en clientes modernos */
    @media (prefers-color-scheme: dark) {
      .email-bg { background-color: #121212 !important; }
      .content-bg { background-color: #1e1e1e !important; border-color: #333 !important; }
      .text-main { color: #ffffff !important; }
      .text-sub { color: #aaaaaa !important; }
      .logo-light { display: none !important; }
      .logo-dark { display: block !important; }}
    </style>
  </head>
    <body style="margin: 0; padding: 20px; background-color: #f4f7f9;" class="email-bg">
      <div class="content-bg" style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
              
        <div style="padding: 25px; text-align: center; background-color:  #ffffff; border-bottom: 1px solid #eeeeee;">
           <img src="${logoLight}" class="logo-light" alt="TuServicio" style="display: block; margin: 0 auto; max-width: 160px; height: auto;">
                
           <img src="${logoDark}" class="logo-dark" alt="TuServicio" style="display: none; margin: 0 auto; max-width: 160px; height: auto;">
        </div>

        <tr>
          <td style="padding: 40px 30px; color: #2f2f31; line-height: 1.6;">
          ${content}
          </td>
        </tr>

        <div style="padding: 20px; background-color: #fafafa; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eeeeee;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} TuServicio App. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
  </html>
`;
// export const baseLayout = (content) => `
//   <div style="background-color: #f2f2f3; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
//     <table align="center" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; border-collapse: collapse;">
//       <tr>
//         <td align="center" style="background-color: #2e294e; padding: 30px;">
//           <img src="https://res.cloudinary.com/dkjixw8hv/image/upload/v1768047833/logo-tuserv-light_ba2egj.webp"
//                alt="TuServicio"
//                width="180"
//                style="display: block; border: 0;">
//         </td>
//       </tr>

//       <tr>
//         <td style="padding: 40px 30px; color: #2f2f31; line-height: 1.6;">
//           ${content}
//         </td>
//       </tr>

//       <tr>
//         <td align="center" style="padding: 20px; background-color: #f2f2f3; color: #949498; font-size: 12px;">
//           <p>© ${new Date().getFullYear()} TuServicio. Todos los derechos reservados.</p>
//         </td>
//       </tr>
//     </table>
//   </div>
// `;
