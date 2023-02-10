const { execSync } = require('child_process')
const fs = require('fs')

const reconstructedFilename = 'reconstructed.js'

const keliling = (jariJari) => {
  let solution = fs.readFileSync('./index.js', 'utf-8')

  solution = solution.replace(/(let|var) jariJari .*/, `$1 jariJari = ${jariJari}`)
  
  fs.writeFileSync(reconstructedFilename, solution)

  return String(execSync(`node ${reconstructedFilename}`))
}

const hasilBenar = (jariJari) => {
    return String(2 * Math.PI * jariJari)
}

afterAll(() => {
  if (fs.existsSync(reconstructedFilename)) {
    fs.unlinkSync(reconstructedFilename)
  }
})

describe('Calculate Circumference', () => {
  describe('Check hasil keliling lingkaran', () => {
    it('cek hasil saat jari-jari 0', () => {
      const val = 0
      expect(keliling(val)).toMatch(hasilBenar(val))
    })
    it('cek hasil saat jari-jari -10', () => {
      const val = -10
      expect(keliling(val)).toMatch(hasilBenar(val))
    })
    it('cek hasil saat jari-jari 10', () => {
      const val = 10
      expect(keliling(val)).toMatch(hasilBenar(val))
    })
    it('cek hasil saat jari-jari 17900', () => {
      const val = 17900
      expect(keliling(val)).toMatch(hasilBenar(val))
    })
    it('cek hasil saat jari-jari 999999', () => {
      const val = 999999
      expect(keliling(val)).toMatch(hasilBenar(val))
    })
  })
})
