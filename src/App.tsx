import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './store/auth'
import { CarsProvider } from './store/cars'
import { I18nProvider } from './i18n/I18nProvider'
import DeviceFrame from './components/DeviceFrame'
import PhoneEntry from './screens/PhoneEntry'
import OtpVerify from './screens/OtpVerify'
import Home from './screens/Home'
import Profile from './screens/Profile'
import AddCar from './screens/AddCar'
import Booking from './screens/Booking'

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <CarsProvider>
          <DeviceFrame>
            <Routes>
              <Route path="/" element={<Navigate to="/register" replace />} />
              <Route path="/register" element={<PhoneEntry />} />
              <Route path="/verify" element={<OtpVerify />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cars/add" element={<AddCar />} />
              <Route path="/book" element={<Booking />} />
            </Routes>
          </DeviceFrame>
        </CarsProvider>
      </AuthProvider>
    </I18nProvider>
  )
}
