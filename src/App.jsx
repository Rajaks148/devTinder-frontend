//import './App.css'

function App() {
  return (
    <>
        <div className="navbar bg-neutral text-neutral-content">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">DevTinder</a>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end mx-5">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src="/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </label>
                
                </div>
            </div>
        </div>
    </>
  );
}

export default App;
