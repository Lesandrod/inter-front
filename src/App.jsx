import { useState } from "react";
import { login, factorizeQR } from "./services/api";

function MatrixTable({ label, data }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-2">{label}</p>
      <div className="overflow-x-auto border border-gray-200">
        <table className="text-xs font-mono border-collapse w-full">
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                {row.map((val, j) => (
                  <td key={j} className="px-3 py-2 text-right border-r border-gray-100 last:border-0">
                    {val.toFixed(4)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  const display = typeof value === "boolean" ? (value ? "Sí" : "No") : value?.toFixed(4);
  return (
    <div className="border border-gray-200 p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-base font-mono font-medium text-gray-900">{display}</p>
    </div>
  );
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [matrixInput, setMatrixInput] = useState("[[1,2],[3,4],[5,6]]");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const { username, password } = Object.fromEntries(new FormData(e.target));
    try {
      setToken(await login(username, password));
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  }

  async function handleFactorize(e) {
    e.preventDefault();
    setError("");
    try {
      setResult(await factorizeQR(JSON.parse(matrixInput)));
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-xs">
          <h1 className="text-lg font-medium text-gray-900 mb-6">QR Factorization</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input name="username" type="text" placeholder="Usuario" required
              className="border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 transition-colors" />
            <input name="password" type="password" placeholder="Contraseña" required
              className="border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 transition-colors" />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit"
              className="bg-gray-900 text-white text-sm py-2 hover:bg-gray-700 transition-colors cursor-pointer">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-10 border-b border-gray-200 pb-4">
          <h1 className="text-sm font-medium text-gray-900 tracking-wide uppercase">QR Factorization</h1>
          <button onClick={() => { localStorage.removeItem("token"); setToken(""); setResult(null); }}
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors cursor-pointer">
            Salir
          </button>
        </header>

        <section className="mb-8">
          <p className="text-xs text-gray-400 mb-2">Matriz de entrada</p>
          <form onSubmit={handleFactorize} className="flex flex-col gap-3">
            <textarea value={matrixInput} onChange={(e) => setMatrixInput(e.target.value)}
              rows={3} spellCheck={false}
              className="border border-gray-300 px-3 py-2 text-sm font-mono outline-none focus:border-gray-900 transition-colors resize-none" />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit"
              className="bg-gray-900 text-white text-sm py-2 hover:bg-gray-700 transition-colors cursor-pointer w-full">
              Factorizar
            </button>
          </form>
        </section>

        {result && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <MatrixTable label="Matriz Q" data={result.q} />
              <MatrixTable label="Matriz R" data={result.r} />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-3">Estadísticas</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <StatCard label="Máximo" value={result.stats.max} />
                <StatCard label="Mínimo" value={result.stats.min} />
                <StatCard label="Promedio" value={result.stats.average} />
                <StatCard label="Suma total" value={result.stats.total} />
                <StatCard label="Diagonal" value={result.stats.hasDiagonalMatrix} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
