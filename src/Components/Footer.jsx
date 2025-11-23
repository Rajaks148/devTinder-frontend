import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <div>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content fixed bottom-0">
            <aside>
                <p>Copyright © { year } - All right reserved by DevTinder</p>
            </aside>
        </footer>
    </div>
  )
}

export default Footer
