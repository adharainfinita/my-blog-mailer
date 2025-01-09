Frontend

Será una aplicación simple con:

    Un input para que el usuario introduzca su correo electrónico.
    Un botón para suscribirse.
    Un diseño limpio y minimalista con texto explicativo.

Backend

El backend manejará:

    Base de datos pequeña:
        Puede ser un archivo JSON o SQLite.
    Dos rutas:
        Ruta para suscripciones: agregar o eliminar correos.
        Ruta para enviar correos: tomará los datos del archivo de texto y enviará el email a todos los suscriptores.
    Función de mailing:
        Leerá el archivo de texto (con los campos Título, Subtítulo y Contenido).
        Enviará los correos a los suscriptores usando Gmail.
