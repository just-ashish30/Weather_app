import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'weather-dashboard-settings'

const defaultSettings = {
  temperatureUnit: 'celsius',
  preferredCity: '',
}

const SettingsContext = createContext(null)

function getStoredSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) }
    }
  } catch (e) {
    console.warn('Could not read settings from localStorage', e)
  }
  return defaultSettings
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (e) {
    console.warn('Could not save settings to localStorage', e)
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(getStoredSettings)

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  const setTemperatureUnit = (unit) => {
    setSettings((prev) => ({ ...prev, temperatureUnit: unit }))
  }

  const setPreferredCity = (city) => {
    setSettings((prev) => ({ ...prev, preferredCity: city }))
  }

  const value = {
    temperatureUnit: settings.temperatureUnit,
    preferredCity: settings.preferredCity,
    setTemperatureUnit,
    setPreferredCity,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) {
    throw new Error('useSettings must be used inside SettingsProvider')
  }
  return ctx
}
