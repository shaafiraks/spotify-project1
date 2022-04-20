const durationHelper = (duration) => {
  // x/60
  var result = 0;
  var sisabagi = 0;
  var hasil = 0;
  var sisadetik = 0;
  if (duration % 60000 === 0) {
    result = duration / 60000;
  } else {
    result = duration / 60000;
    sisabagi = duration % 60000;

    if (sisabagi % 1000 === 0) {
      hasil = sisabagi / 1000;
    } else {
      hasil = sisabagi / 1000;
      sisadetik = sisabagi % 1000;
    }
  }
  var menit = Math.floor(result);
  var detik = Math.floor(hasil);

  // console.log(`${menit}m ${detik}s`);
  return `${menit}m ${detik}s`;
};

// durationHelper(179423);

export default durationHelper;

// var = jika nilai nya ingin bisa berubah
// const = jika ingin nilainya berubah sekali,
// let = jika ingin nilainy bisa di baca dalam satu kurung.
