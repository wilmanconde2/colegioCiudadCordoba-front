// src/pages/DIAN.jsx

const DIAN_URL = 'https://drive.google.com/drive/folders/1WQxB8YcoqMrXuf9HG3P9DjbKSxGSifbk';

const DIAN = () => {
  return (
    <section className='container py-5 text-center dian-page'>
      <img src='/dian.svg' alt='DIAN' className='dian-logo' />

      <h1>Documentos DIAN</h1>

      <p>
        Consulte los documentos tributarios y certificados institucionales disponibles en la carpeta
        oficial del Colegio Ciudad Córdoba.
      </p>

      <a href={DIAN_URL} target='_blank' rel='noopener noreferrer' className='btn btn-primary'>
        Acceder a documentos DIAN
      </a>
    </section>
  );
};

export default DIAN;
