export interface IMasterCountry {
  code: string
  mobilePhonePrefix: string
  name: string
  oid: string
  region: string
  subRegion: string
}

export interface IMasterProvince {
  country: string
  name: string
  oid: string
}

export interface IMasterCity {
  name: string
  oid: string
  province: string
}

export interface IMasterDistrict {
  city: string
  name: string
  oid: string
}

export interface IMasterSubDistrict {
  name: string
  oid: string
}

export interface IMasterEducationLevel {
  name: string
  oid: string
}

export interface IMasterGender {
  name: string
  oid: string
}

export interface IMasterReligion {
  name: string
  oid: string
}

export interface IMasterMaritalStatus {
  name: string
  oid: string
}

export interface IMasterFileType {
  extension: string // id
  name: string
}

export interface IMasterReason {
  name: string
  oid: string
}
