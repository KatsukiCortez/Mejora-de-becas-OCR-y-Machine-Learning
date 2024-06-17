CREATE TABLE Estudiante (
  idEstudiante INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(50),
  apPaterno VARCHAR(50),
  apMaterno VARCHAR(50),
  direccion VARCHAR(100),
  fechaNacimiento DATE
);

CREATE TABLE IngresoFamiliares (
  idIngresoFamiliar INT PRIMARY KEY AUTO_INCREMENT, 
  ingresosMensuales DECIMAL(10, 2),
  numMiembrosFamilia INT,
  idEstudiante INT,
  FOREIGN KEY (idEstudiante) REFERENCES Estudiante(idEstudiante)
);

CREATE TABLE HistorialAcademico (
  idHistorial INT PRIMARY KEY AUTO_INCREMENT, 
  promedio DECIMAL(5, 2),
  institucionEducativa VARCHAR(100),
  idEstudiante INT,
  FOREIGN KEY (idEstudiante) REFERENCES Estudiante(idEstudiante)
);

CREATE TABLE Documentos (
  idDocumento INT PRIMARY KEY AUTO_INCREMENT, 
  resultadoAnalisisML VARCHAR(255),
  comentarios VARCHAR(255),
  fecha DATE,
  idEstudiante INT,
  FOREIGN KEY (idEstudiante) REFERENCES Estudiante(idEstudiante)
);

CREATE TABLE Roles (
  idRol INT PRIMARY KEY AUTO_INCREMENT,  
  rol VARCHAR(20) UNIQUE
);

CREATE TABLE Usuarios (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,  
  email VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  idRol INT,
  FOREIGN KEY (idRol) REFERENCES Roles(idRol)
);

CREATE TABLE SolicitudesBecas (
  idSolicitud INT PRIMARY KEY AUTO_INCREMENT, 
  idEstudiante INT,
  tipoBeca VARCHAR(50),
  estado VARCHAR(20),
  fechaSolicitud DATE,
  FOREIGN KEY (idEstudiante) REFERENCES Estudiante(idEstudiante)
);

CREATE TABLE SeguimientoBecas (
  idSeguimiento INT PRIMARY KEY AUTO_INCREMENT,
  idSolicitud INT,
  fechaInicio DATE,
  fechaFin DATE,
  estadoActual VARCHAR(20),
  comentarios VARCHAR(255),
  FOREIGN KEY (idSolicitud) REFERENCES SolicitudesBecas(idSolicitud)
);

CREATE TABLE HistorialAcceso (
  idHistorial INT PRIMARY KEY AUTO_INCREMENT, 
  idUsuario INT,
  fechaHora DATETIME DEFAULT CONVERT_TZ(NOW(), '+00:00', '+00:00'),
  tipoAccion VARCHAR(50),
  FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario)
);

CREATE TABLE ComunicacionesUsuarios (
  idComunicacion INT PRIMARY KEY AUTO_INCREMENT, 
  idEstudiante INT,
  mensaje VARCHAR(255),
  fechaEnvio DATETIME DEFAULT CONVERT_TZ(NOW(), '+00:00', '+00:00'),
  FOREIGN KEY (idEstudiante) REFERENCES Estudiante(idEstudiante)
);


INSERT INTO Roles (idRol, rol) VALUES
(1, 'administrador'),
(2, 'calificador');

INSERT INTO Estudiante (email, nombre, apPaterno, apMaterno, direccion, fechaNacimiento) VALUES
('luis.gonzalez@example.com', 'Luis', 'González', 'Martínez', 'Av. Principal 123', '2001-03-10'),
('marta.fernandez@example.com', 'Marta', 'Fernández', 'López', 'Calle Secundaria 456', '1999-07-25'),
('andres.gomez@example.com', 'Andrés', 'Gómez', 'Rodríguez', 'Plaza Central 789', '2003-01-15'),
('lucia.martinez@example.com', 'Lucía', 'Martínez', 'Sánchez', 'Av. Libertad 456', '2000-05-20'),
('daniel.hernandez@example.com', 'Daniel', 'Hernández', 'Pérez', 'Calle Principal 789', '2002-08-12'),
('eva.garcia@example.com', 'Eva', 'García', 'Fernández', 'Av. Independencia 123', '1998-12-30'),
('marcos.sanchez@example.com', 'Marcos', 'Sánchez', 'Gómez', 'Calle Central 456', '2004-02-28'),
('lucas.rodriguez@example.com', 'Lucas', 'Rodríguez', 'Martínez', 'Plaza Libertad 789', '2001-06-05'),
('ana.perez@example.com', 'Ana', 'Pérez', 'Hernández', 'Av. Primavera 123', '1999-10-15'),
('maria.gomez@example.com', 'María', 'Gómez', 'Fernández', 'Calle Jardín 456', '2003-04-20');


INSERT INTO IngresoFamiliares (ingresosMensuales, numMiembrosFamilia, idEstudiante) VALUES
(2500.00, 3, 1),
(4000.00, 4, 2),
(6000.00, 5, 3),
(3200.00, 3, 4),
(7500.00, 6, 5),
(1800.00, 2, 6),
(4200.00, 4, 7),
(5500.00, 5, 8),
(2800.00, 3, 9),
(6500.00, 4, 10);

INSERT INTO HistorialAcademico (promedio, institucionEducativa, idEstudiante) VALUES
(8.75, 'Colegio San José', 1),
(9.20, 'Universidad Nacional', 2),
(7.80, 'Instituto Tecnológico', 3),
(8.50, 'Colegio San Marcos', 4),
(9.80, 'Escuela Técnica Industrial', 5),
(7.20, 'Colegio Santa María', 6),
(8.90, 'Universidad Politécnica', 7),
(7.60, 'Colegio San Pablo', 8),
(8.30, 'Instituto de Ciencias', 9),
(9.40, 'Universidad del Sur', 10);

INSERT INTO Documentos (resultadoAnalisisML, comentarios, fecha, idEstudiante) VALUES
('Aprobado', 'Excelente presentación', '2024-05-15', 1),
('Rechazado', 'Falta firma', '2024-04-20', 2),
('En revisión', 'Documentos incompletos', '2024-05-10', 3),
('Aprobado', 'Cumple con requisitos', '2024-06-02', 4),
('En revisión', 'Falta documentación adicional', '2024-05-18', 5),
('Rechazado', 'No cumple con el formato', '2024-04-30', 6),
('Aprobado', 'Recomendación del comité', '2024-05-25', 7),
('En revisión', 'Necesita validación', '2024-06-10', 8),
('Rechazado', 'Información contradictoria', '2024-05-05', 9),
('Aprobado', 'Documentación completa', '2024-04-15', 10);

INSERT INTO Usuarios (email, nombre, password, idRol) VALUES
('usuario1@example.com', 'Juan Pérez', 'contraseña123', 1),
('usuario2@example.com', 'María González', 'segura456', 1),
('usuario3@example.com', 'Pedro López', 'clave789', 1),
('usuario4@example.com', 'Ana Martínez', 'contraseña123', 2),
('usuario5@example.com', 'Carlos Sánchez', 'segura456', 2),
('usuario6@example.com', 'Laura García', 'clave789', 2),
('ejemplo1@dominio.com', 'Juan López', 'clave123', 3),
('ejemplo2@dominio.com', 'María García', 'segura456', 3),
('ejemplo3@dominio.com', 'Pedro Martínez', 'contraseña789', 3),
('ejemplo4@dominio.com', 'Ana Rodríguez', 'clave456', 3),
('ejemplo5@dominio.com', 'Carlos Sánchez', 'segura789', 3),
('ejemplo6@dominio.com', 'Laura Pérez', 'contraseña123', 3),
('ejemplo7@dominio.com', 'Sofía González', 'clave789', 3),
('ejemplo8@dominio.com', 'Diego Fernández', 'segura123', 3),
('ejemplo9@dominio.com', 'Elena Ruiz', 'contraseña456', 3),
('ejemplo10@dominio.com', 'Pablo Gómez', 'segura789', 3);

INSERT INTO SolicitudesBecas (idEstudiante, tipoBeca, estado, fechaSolicitud) VALUES
(1, 'Beca de Mérito', 'En Revisión', '2024-05-20'),
(2, 'Beca Deportiva', 'Aprobada', '2024-04-05'),
(3, 'Beca Cultural', 'Rechazada', '2024-05-10'),
(4, 'Beca de Investigación', 'En Proceso', '2024-06-02'),
(5, 'Beca de Mérito', 'En Revisión', '2024-05-18'),
(6, 'Beca Deportiva', 'Aprobada', '2024-04-30'),
(7, 'Beca Cultural', 'Rechazada', '2024-05-25'),
(8, 'Beca de Investigación', 'En Proceso', '2024-06-10'),
(9, 'Beca de Mérito', 'En Revisión', '2024-05-05'),
(10, 'Beca Deportiva', 'Aprobada', '2024-04-15');

INSERT INTO SeguimientoBecas (idSolicitud, fechaInicio, fechaFin, estadoActual, comentarios) VALUES
(1, '2024-05-22', '2024-06-15', 'En proceso', 'Falta documentación adicional'),
(2, '2024-04-10', '2024-04-25', 'Finalizada', 'Todo correcto'),
(3, '2024-05-12', '2024-05-20', 'Rechazada', 'No cumple requisitos'),
(4, '2024-06-05', '2024-06-30', 'En revisión', 'Falta informe final'),
(5, '2024-05-25', '2024-06-10', 'En proceso', 'Revisión de antecedentes'),
(6, '2024-04-15', '2024-04-30', 'Finalizada', 'Informe entregado correctamente'),
(7, '2024-06-01', '2024-06-20', 'Rechazada', 'Falta documentación cultural'),
(8, '2024-06-12', '2024-07-05', 'En revisión', 'Validación de resultados'),
(9, '2024-05-10', '2024-05-30', 'En proceso', 'Falta documentación familiar'),
(10, '2024-04-20', '2024-05-05', 'Finalizada', 'Entrevista realizada satisfactoriamente');

INSERT INTO HistorialAcceso (idUsuario, tipoAccion) VALUES
(1, 'Inicio de sesión'),
(2, 'Inicio de sesión'),
(3, 'Inicio de sesión'),
(4, 'Cambio de contraseña'),
(5, 'Cambio de contraseña'),
(6, 'Registro de nuevo usuario'),
(7, 'Inicio de sesión'),
(8, 'Cambio de contraseña'),
(9, 'Registro de nuevo usuario'),
(10, 'Inicio de sesión');

INSERT INTO ComunicacionesUsuarios (idEstudiante, mensaje) VALUES
(1, 'Recuerde enviar el documento adicional para la beca'),
(2, 'Confirmación de inicio de sesión'),
(3, 'Recuerde completar su perfil'),
(4, 'Su contraseña ha sido modificada'),
(5, 'Confirmación de cambio de contraseña'),
(6, 'Bienvenido al sistema'),
(7, 'Recordatorio: Revisión de documentación'),
(8, 'Cambio de contraseña exitoso'),
(9, 'Su perfil ha sido actualizado'),
(10, 'Nueva notificación disponible');


DELIMITER //
CREATE TRIGGER after_cambio_contraseña AFTER UPDATE ON Usuarios
FOR EACH ROW
BEGIN
    IF NEW.password <> OLD.password THEN
        INSERT INTO HistorialAcceso (idUsuario, tipoAccion)
        VALUES (NEW.idUsuario, 'Cambio de contraseña');
    END IF;
END;
//
DELIMITER ;


DELIMITER //
CREATE TRIGGER after_actualizar_estudiante AFTER UPDATE ON Estudiante
FOR EACH ROW
BEGIN
    DECLARE columna_modificada VARCHAR(50);
    IF OLD.nombre <> NEW.nombre THEN
        SET columna_modificada = 'nombre';
    ELSEIF OLD.apPaterno <> NEW.apPaterno THEN
        SET columna_modificada = 'apPaterno';
    ELSEIF OLD.apMaterno <> NEW.apMaterno THEN
        SET columna_modificada = 'apMaterno';
    ELSEIF OLD.direccion <> NEW.direccion THEN
        SET columna_modificada = 'direccion';
    ELSEIF OLD.fechaNacimiento <> NEW.fechaNacimiento THEN
        SET columna_modificada = 'fechaNacimiento';
    ELSE
        SET columna_modificada = 'otros';
    END IF;

    INSERT INTO HistorialAcceso (idUsuario, tipoAccion, detalle)
    VALUES (NEW.idEstudiante, 'Actualización de estudiante', columna_modificada);
END;
//
DELIMITER ;



