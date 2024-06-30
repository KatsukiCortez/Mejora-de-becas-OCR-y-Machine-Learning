import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
} from 'recharts';

const Estadisticas = () => {
  const [cantidadEstudiantes, setCantidadEstudiantes] = useState(0);
  const [promedioIngresosFamiliares, setPromedioIngresosFamiliares] = useState(0);
  const [promedioAcademico, setPromedioAcademico] = useState(0);
  const [solicitudesBecas, setSolicitudesBecas] = useState({});
  const [tiposBecas, setTiposBecas] = useState({});
  const [documentos, setDocumentos] = useState({});

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const estudiantesResponse = await axios.get('http://localhost:8080/octi/estudiante');
        console.log('Estudiantes Response:', estudiantesResponse.data);
        setCantidadEstudiantes(estudiantesResponse.data.length);

        const ingresosResponse = await axios.get('http://localhost:8080/octi/ingresos-familiares');
        console.log('Ingresos Response:', ingresosResponse.data);

        if (Array.isArray(ingresosResponse.data)) {
          const totalIngresos = ingresosResponse.data.reduce((acc, ingreso) => {
            return acc + parseFloat(ingreso.ingresosMensuales);
          }, 0);
          setPromedioIngresosFamiliares(totalIngresos / ingresosResponse.data.length);
          console.log('respuesta ingreso familiares:', totalIngresos);
        } else {
          console.error('Ingresos Response is not an array');
        }

        const historialAcademicoResponse = await axios.get('http://localhost:8080/octi/historial-academico');
        console.log('Historial Academico Response:', historialAcademicoResponse.data);

        if (Array.isArray(historialAcademicoResponse.data)) {
          const totalPromedio = historialAcademicoResponse.data.reduce((acc, historial) => {
            return acc + parseFloat(historial.promedio);
          }, 0);
          setPromedioAcademico(totalPromedio / historialAcademicoResponse.data.length);
          console.log('respuesta historial academico:', totalPromedio);
        } else {
          console.error('Historial Academico Response is not an array');
        }

        const solicitudesResponse = await axios.get('http://localhost:8080/octi/solicitudes-becas');
        console.log('Solicitudes Response:', solicitudesResponse.data);

        if (Array.isArray(solicitudesResponse.data)) {
          const solicitudesPorEstado = solicitudesResponse.data.reduce((acc, solicitud) => {
            acc[solicitud.estado] = (acc[solicitud.estado] || 0) + 1;
            return acc;
          }, {});
          setSolicitudesBecas(solicitudesPorEstado);

          const tiposBecasResponse = solicitudesResponse.data.reduce((acc, solicitud) => {
            acc[solicitud.tipoBeca] = (acc[solicitud.tipoBeca] || 0) + 1;
            return acc;
          }, {});
          setTiposBecas(tiposBecasResponse);
        } else {
          console.error('Solicitudes Response is not an array');
        }

        const documentosResponse = await axios.get('http://localhost:8080/octi/documentos');
        console.log('Documentos Response:', documentosResponse.data);

        if (Array.isArray(documentosResponse.data)) {
          const estadoDocumentos = documentosResponse.data.reduce((acc, documento) => {
            acc[documento.resultadoAnalisisML] = (acc[documento.resultadoAnalisisML] || 0) + 1;
            return acc;
          }, {});
          setDocumentos(estadoDocumentos);
        } else {
          console.error('Documentos Response is not an array');
        }
      } catch (error) {
        console.error('Error fetching estadisticas:', error);
      }
    };

    fetchEstadisticas();
  }, []);

  // Datos para los gráficos
  const dataSolicitudes = Object.keys(solicitudesBecas).map(key => ({
    name: key,
    value: solicitudesBecas[key],
  }));

  const dataTiposBecas = Object.keys(tiposBecas).map(key => ({
    name: key,
    value: tiposBecas[key],
  }));

  const dataDocumentos = Object.keys(documentos).map(key => ({
    name: key,
    value: documentos[key],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h1>Estadísticas</h1>
      <div>
        <h2>Cantidad de Estudiantes Registrados</h2>
        <BarChart
          width={500}
          height={300}
          data={[{ name: 'Estudiantes', value: cantidadEstudiantes }]}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" type="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
      <div>
        <h2>Promedio de Ingresos Familiares</h2>
        <BarChart
          width={500}
          height={300}
          data={[{ name: 'Promedio de Ingresos', value: promedioIngresosFamiliares.toFixed(2) }]}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" type="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
      <div>
        <h2>Promedio Académico General de los Estudiantes</h2>
        <BarChart
          width={500}
          height={300}
          data={[{ name: 'Promedio Académico', value: promedioAcademico.toFixed(2) }]}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" type="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
      <div>
        <h2>Cantidad de Solicitudes de Becas por Estado</h2>
        <BarChart
          width={500}
          height={300}
          data={dataSolicitudes}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" type="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
      <div>
        <h2>Distribución de Tipos de Becas Solicitadas</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={dataTiposBecas}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataTiposBecas.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div>
        <h2>Cantidad de Documentos Aprobados, Rechazados y en Revisión</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={dataDocumentos}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataDocumentos.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

export default Estadisticas;
