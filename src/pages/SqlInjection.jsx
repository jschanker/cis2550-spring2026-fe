import React, { useState, useEffect } from 'react';

const SqlInjection = () => {
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [loginMsg, setLoginMsg] = useState(null);

  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  //const [executedQuery, setExecutedQuery] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sql-injection/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginCreds),
      });
      const data = await res.json();
      setLoginMsg(data.message || data.error);
    } catch (err) {
      setLoginMsg("Connection Error");
    }
  };

  const fetchProducts = async (catInput) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sql-injection/products?category=${encodeURIComponent(catInput)}`);
      const result = await res;
      if (res.ok) {
        setProducts(await result.json() || []);
        setError(null);
      } else {
        const err = await result.text();
        setError(err || "SQL Execution Error");
        setProducts([{Error: err || "SQL Execution Error"}]);
        //setExecutedQuery(result.executed_query);
      }
    } catch (err) {
      setError("Failed to connect to API");
    }
  };

  const getUniqueKeys = (dataArray) => {
    const s = new Set();
    dataArray.forEach(item => {
      Object.keys(item).forEach(key => s.add(key));
    });
    return Array.from(s);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">

        <header className="border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-blue-400">SQL Injection Laboratory</h1>
          <p className="text-gray-400">Target Database: <span className="text-orange-400 font-mono italic underline">Oracle 19c (Simulated)</span></p>
        </header>

        <section className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>🔐</span> Admin Authentication
          </h2>
          <form onSubmit={handleLogin} className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Username</label>
              <input
                type="text"
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-64"
                onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Password</label>
              <input
                type="password"
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-64"
                onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded transition">
              Sign In
            </button>
          </form>
        </section>

        <section className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-400">
            <span>📦</span> Product Catalog Search
          </h2>
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Enter category (e.g., foo, tool)..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-green-500"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded transition"
              onClick={(e) => {
                fetchProducts(category);
              }}>
              Search Product Listing
            </button>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded mb-4 font-mono text-sm">
              <strong>DATABASE ERROR:</strong> {error}
            </div>
          )}

          <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-700 text-gray-300 uppercase text-xs tracking-wider">
                <tr>
                  {products.length > 0 ? getUniqueKeys(products).map(key => (
                    <th key={key} className="px-6 py-3 border-b border-gray-600">{key}</th>
                  )) : (
                    <th className="px-6 py-3">No Results Found</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {products.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-750 transition">
                    {getUniqueKeys(products).map((field, i) => (
                      <td key={i} className="px-6 py-4 font-mono text-sm">
                        {item[field] == undefined ? <span className="text-gray-600 italic">NULL</span> : item[field]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/*<section className="bg-black p-4 rounded border-l-4 border-blue-500 font-mono text-sm shadow-inner">
          <p className="text-blue-400 mb-2">// Server-side Query Execution Context</p>
          <div className="text-gray-300 break-all leading-relaxed">
            <span className="text-green-500">SQL&gt;</span> {executedQuery || "Awaiting input..."}
          </div>
        </section>*/}
      </div>

      {loginMsg && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-600 p-8 rounded-lg max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Server Response</h3>
            <p className="text-gray-300 mb-6">{loginMsg}</p>
            <button
              onClick={() => setLoginMsg(null)}
              className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
            >Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SqlInjection;