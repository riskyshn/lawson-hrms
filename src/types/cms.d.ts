interface ICms {
  oid?: string
  company?: {
    name?: string
    logo?: string
    code?: string
    oid?: string
  }
  hero?: {
    asset?: string
    heading?: {
      en?: string
      id?: string
    }
  }
  sectionA?: {
    asset?: string
    heading?: {
      en?: string
      id?: string
    }
    paragraph?: {
      en?: string
      id?: string
    }
  }
  sectionB?: {
    asset?: string
    heading?: {
      en?: string
      id?: string
    }
    paragraph?: {
      en?: string
      id?: string
    }
  }
  banner?: {
    asset?: string
    heading?: {
      en?: string
      id?: string
    }
    callToAction?: string
  }
  findJob?: {
    asset?: string
    heading?: {
      en?: string
      id?: string
    }
  }
  login?: {
    asset?: string
    heading?: {
      en?: string
      id?: string
    }
    subheading?: {
      en?: string
      id?: string
    }
  }
  register?: {
    asset?: string
    heading?: {
      en?: string
      id?: string
    }
    subheading?: {
      en?: string
      id?: string
    }
  }
  generalSettings?: {
    font?: string
    backgroundColor?: string
    callToActionColor?: string
    headingColor?: string
    subheadingColor?: string
    paragraphColor?: string
  }
}

interface IHomeData {
  bannerAsset?: string
  bannerCallToAction?: string
  bannerHeadingEn?: string
  bannerHeadingId?: string
  heroAsset?: string
  heroHeadingEn?: string
  heroHeadingId?: string
  sectionAAsset?: string
  sectionAHeadingEn?: string
  sectionAHeadingId?: string
  sectionAParagraphEn?: string
  sectionAParagraphId?: string
  sectionBAsset?: string
  sectionBHeadingEn?: string
  sectionBHeadingId?: string
  sectionBParagraphEn?: string
  sectionBParagraphId?: string
}

interface IJobData {
  backgroundColor?: string
  callToActionColor?: string
  findJobAsset?: string
  findJobHeadingEn?: string
  findJobHeadingId?: string
  headingColor?: string
  loginAsset?: string
  loginHeadingEn?: string
  loginHeadingId?: string
  loginSubheadingEn?: string
  loginSubheadingId?: string
  paragraphColor?: string
  registerAsset?: string
  registerHeadingEn?: string
  registerHeadingId?: string
  registerSubheadingEn?: string
  registerSubheadingId?: string
  subheadingColor?: string
}
