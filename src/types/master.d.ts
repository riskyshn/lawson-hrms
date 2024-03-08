export interface IMasterCountry {
  oid: string
  name: string
  code: string
  region: string
  mobilePhonePrefix: string
  subRegion: string
}

export interface IMasterProvince {
  oid: string
  name: string
  country: string
}

export interface IMasterCity {
  oid: string
  name: string
  province: string
}

export interface IMasterDistrict {
  oid: string
  name: string
  city: string
}

export interface IMasterSubDistrict {
  oid: string
  name: string
}
