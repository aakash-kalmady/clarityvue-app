export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <style jsx>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh; /* Full screen height */
          background-color: rgba(
            255,
            255,
            255,
            0.8
          ); /* Semi-transparent overlay */
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #333;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
