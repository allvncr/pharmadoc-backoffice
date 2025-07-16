export default class Medecine {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.categoryDTO = data.categoryDTO
    this.subCategoryDTO = data.subCategoryDTO
    this.reference = data.reference
    this.newPrice = data.newPrice
    this.oldPrice = data.oldPrice
    this.smallDescription = data.smallDescription
    this.completeDescription = data.completeDescription
    this.url = data.url
    this.composition = data.composition
    this.usingAdvice = data.usingAdvice
  }

  static create(data) {
    return new Medecine(data)
  }
}
