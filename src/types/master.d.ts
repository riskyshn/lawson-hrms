interface IMasterCountry {
  oid: string
  name: string
  code: string
  region: string
  mobilePhonePrefix: string
  subRegion: string
}

interface IMasterProvince {
  oid: string
  name: string
  country: string
}

interface IMasterCity {
  oid: string
  name: string
  province: string
}

interface IMasterDistrict {
  oid: string
  name: string
  city: string
}

interface IMasterSubDistrict {
  oid: string
  name: string
}

interface IMasterEducationLevel {
  oid: string
  name: string
}

interface IMasterGender {
  oid: string
  name: string
}

interface IMasterReligion {
  oid: string
  name: string
}

interface IMasterMaritalStatus {
  oid: string
  name: string
}
