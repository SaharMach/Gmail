const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { MailDetail } from "./apps/mail/views/MailDetails.jsx"

export function App() {
    return <Router>
        <section className="app">
            <Routes>
                <Route path="/" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetail />} />
            </Routes>
        </section>
    </Router>
}
