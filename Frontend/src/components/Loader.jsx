function Loader() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div style={{
        display: 'inline-block',
        width: '40px',
        height: '40px',
        border: '4px solid #30363D',
        borderTop: '4px solid #F0A500',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default Loader;