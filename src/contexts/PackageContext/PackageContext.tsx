import React, { createContext, FC, useContext, useState } from 'react'
import { Package } from '@models/Package'

type ContextData = {
  selectedPackage?: Package
}

type ContextFunctions = {
  setSelectedPackage: (pck: Package) => void
}

const initialState: ContextData = {
  selectedPackage: undefined,
}

export type ContextValue = ContextData & ContextFunctions

export const PackageContext = createContext<ContextValue>({} as any)

export const PackageProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ContextData>({
    ...initialState,
  })

  const setSelectedPackage = (selectedPackage: Package) =>
    setData((prev) => ({
      ...prev,
      selectedPackage: {
        ...prev.selectedPackage,
        ...selectedPackage,
      },
    }))

  return (
    <PackageContext.Provider
      value={{
        ...data,
        setSelectedPackage,
      }}
    >
      {children}
    </PackageContext.Provider>
  )
}

export const usePackageContext = (): ContextValue => {
  return useContext(PackageContext)
}
