import {parse} from 'csv-parse'

export class IntegrationParser {
  static async parseCSV(file: Express.Multer.File): Promise<any[]> {
    const records = []
    const parser = parse(file.buffer, {
      columns: true,
      skipEmptyLines: true,
      cast: true,
      groupColumnsByName: true,
    })

    for await (const record of parser) {
      records.push(record)
    }

    return records
  }
}
