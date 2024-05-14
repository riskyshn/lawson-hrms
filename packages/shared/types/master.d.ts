interface IMasterCountry {
  code: string
  mobilePhonePrefix: string
  name: string
  oid: string
  region: string
  subRegion: string
}

interface IMasterProvince {
  country: string
  name: string
  oid: string
}

interface IMasterCity {
  name: string
  oid: string
  province: string
}

interface IMasterDistrict {
  city: string
  name: string
  oid: string
}

interface IMasterSubDistrict {
  name: string
  oid: string
}

interface IMasterEducationLevel {
  name: string
  oid: string
}

interface IMasterGender {
  name: string
  oid: string
}

interface IMasterReligion {
  name: string
  oid: string
}

interface IMasterMaritalStatus {
  name: string
  oid: string
}

interface IMasterFileType {
  extension: string // id
  name: string
}

interface IMasterReason {
  name: string
  oid: string
}
