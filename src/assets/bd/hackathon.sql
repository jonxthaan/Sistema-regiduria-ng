CREATE DATABASE IF NOT EXISTS sistema_regiduria;
USE sistema_regiduria;

CREATE TABLE niveles_educativos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    orden_salida INT NOT NULL, 
    color_mapa VARCHAR(20) NOT NULL, 
    descripcion TEXT
);

INSERT INTO niveles_educativos (nombre, orden_salida, color_mapa) VALUES 
('Preescolar', 1, 'primary'), 
('Primaria', 2, 'danger'),    
('Secundaria', 3, 'success'), 
('Medio Superior', 4, 'info'),
('Superior', 5, 'warning');


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cct_usuario VARCHAR(50) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL,
    nombre_escuela VARCHAR(100) NOT NULL,
    nombre_director VARCHAR(100),
    nivel_id INT,
    rol ENUM('admin', 'escuela') DEFAULT 'escuela',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nivel_id) REFERENCES niveles_educativos(id)
);

INSERT INTO usuarios (cct_usuario, password, nombre_escuela, nombre_director, rol) 
VALUES ('admin', 'admin123', 'Regiduría de Educación', 'Administrador General', 'admin');

-- Escuelas de Ejemplo
INSERT INTO usuarios (cct_usuario, password, nombre_escuela, nombre_director, nivel_id, rol) VALUES 
('20DJN0234Y', 'escuela123', 'Jardín de Niños Luz y Saber', 'Lic. María González', 1, 'escuela'),
('20DPR1055X', 'escuela123', 'Esc. Primaria Benito Juárez', 'Prof. Juan Pérez', 2, 'escuela'),
('20DST0045Z', 'escuela123', 'Secundaria Técnica #45', 'Ing. Roberto Díaz', 3, 'escuela');


CREATE TABLE convocatorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    tipo_evento VARCHAR(50) NOT NULL, 
    fecha_evento DATE NOT NULL,
    hora_reunion TIME NOT NULL,
    descripcion TEXT,
    archivo_pdf VARCHAR(255), 
    estado ENUM('activa', 'cerrada', 'finalizada') DEFAULT 'activa',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO convocatorias (titulo, tipo_evento, fecha_evento, hora_reunion, descripcion) 
VALUES ('Desfile Conmemorativo 20 de Noviembre', 'Desfile', '2025-11-20', '07:30:00', 'Punto de reunión: Parque Central.');


CREATE TABLE avisos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    convocatoria_id INT,
    mensaje TEXT NOT NULL,
    tipo_aviso ENUM('normal', 'urgente') DEFAULT 'normal',
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (convocatoria_id) REFERENCES convocatorias(id)
);

INSERT INTO avisos (mensaje, tipo_aviso) VALUES ('Se les recuerda que el cierre de registro es el 15 de Noviembre.', 'normal');


CREATE TABLE participaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    convocatoria_id INT NOT NULL,
    escuela_id INT NOT NULL,
    director_responsable VARCHAR(100),
    maestros_acompanantes TEXT,
    num_grupos INT DEFAULT 0,
    alumnos_programados INT DEFAULT 0, -- Dato previo
    alumnos_reales INT DEFAULT NULL,   -- Dato día del evento (Asistencia)
    resena_historica VARCHAR(255),     -- Archivo
    orden_asignado INT DEFAULT NULL,   -- Para organizar "quién va detrás de quién"
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (convocatoria_id) REFERENCES convocatorias(id),
    FOREIGN KEY (escuela_id) REFERENCES usuarios(id)
);

-- Ejemplo de registros
INSERT INTO participaciones (convocatoria_id, escuela_id, director_responsable, num_grupos, alumnos_programados) 
VALUES (1, 2, 'Lic. María González', 2, 50); -- Preescolar registrado
