export interface Scientist {
  name: string;
  date: string;
  history: string;
}

export const scientistsJson: Scientist[] = [
  {
    name: "Hipparkos",
    date: "M.Ö. yaklaşık 190–120",
    history:
      "Genellikle 'Trigonometri'nin Babası' olarak anılan Hipparkos, trigonometrik kavramları sistematik olarak geliştiren ilk kişidir. Çalışmaları, çemberdeki kirişleri kullanarak bir trigonometrik tablo oluşturma üzerine odaklanmıştır — bu, modern sinüs fonksiyonuna oldukça yakın bir kavramdır. Bu tabloları güneş ve ay tutulmalarını tahmin etmek gibi küresel astronomi problemlerini çözmekte kullanmıştır. Gökyüzünü nicel bir yöntemle incelemeyi başlatan Hipparkos, hem astronomi hem de matematikte gelecekteki gelişmelerin temelini atmıştır.",
  },
  {
    name: "Klaudyos Batlamyus",
    date: "M.S. yaklaşık 100–170",
    history:
      "Batlamyus, Hipparkos’un fikirlerini Almagest adlı başyapıtında geliştirerek trigonometrik tabloları daha da hassas hale getirmiş ve üçgen çözümleme yöntemlerini tanıtmıştır. Kirişleri yoğun olarak kullanmış ve gezegenlerin konumlarını daha doğru hesaplamaya olanak tanıyan daha hassas bir kiriş tablosu sunmuştur. Çalışmaları, bin yılı aşkın süre boyunca astronomi ve matematik düşüncesine yön vermiş ve Yunan trigonometresinin Orta Çağ boyunca korunmasında hayati rol oynamıştır.",
  },
  {
    name: "Aryabhata",
    date: "476–550",
    history:
      "Aryabhata, trigonometrik kavramları yeniden tanımlayan öncü bir Hintli matematikçi ve astronomdu. Kirişler yerine sinüs (jya) ve kosinüs (kojya) kullanımıyla açı ve mesafelerin hesaplanma biçimini devrimsel şekilde değiştirdi. Aryabhatiya adlı eserinde oldukça hassas sinüs tabloları sunmuş ve Hint trigonometri geleneğinin temelini atmıştır. Fikirleri, çeviriler yoluyla İslam ve Avrupa bilim insanlarını önemli ölçüde etkilemiştir.",
  },
  {
    name: "El-Battani",
    date: "M.S. yaklaşık 858–929",
    history:
      "İslam’ın Altın Çağı’nın önemli isimlerinden El-Battani, sinüs, kosinüs ve tanjant gibi günümüz trigonometrik fonksiyonlarını tanıtmış ve Yunanların kiriş sisteminden uzaklaşmıştır. Özellikle 'Zij el-Sabi' adlı eserinde, bu fonksiyonların değerlerini seleflerinden daha hassas şekilde hesaplamıştır. Güneş ve ay hareketlerini içeren modelleri oldukça doğruydu ve çalışmaları Orta Çağ Avrupası'nda büyük etki yaratarak Rönesans astronomisini şekillendirmiştir.",
  },
  {
    name: "Nasirüddin Tusi",
    date: "1201–1274",
    history:
      "El-Tusi, göksel seyir ve astronomi için temel olan küresel trigonometride büyük ilerlemeler kaydetmiştir. Trigonometriyi ilk kez astronomiden bağımsız bir matematiksel disiplin olarak ele almıştır. 'Dörtgen Üzerine İnceleme' adlı kitabında küresel üçgenler için sinüs ve kosinüs yasalarını sunmuş ve günümüzde de kullanılan birçok temel ilkeyi ortaya koymuştur. Kesin ve aksiyomatik yaklaşımı, daha sonra Avrupa’da yapılacak olan biçimsel çalışmalara zemin hazırlamıştır.",
  },
  {
    name: "Regiomontanus",
    date: "1436–1476",
    history:
      "Bir Rönesans matematikçisi ve astronomu olan Regiomontanus, Yunan ve İslam trigonometri mirasını Avrupa’da yeniden canlandırmış ve geliştirmiştir. Klasik eserleri çevirip derlemiş, 'Her Türlü Üçgen Üzerine' adlı kitabında trigonometrinin Avrupa’da ilk kez ayrı bir matematik dalı olarak tanımını yapmıştır. Çalışmaları, Batı’da trigonometrik bilginin yayılmasında önemli rol oynamış ve Kopernik gibi isimleri etkilemiştir.",
  },
];
