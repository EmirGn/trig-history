export interface Scientist {
  name: string;
  date: string;
  history: string;
}

export const scientistsJson: Scientist[] = [
  {
    name: "Hipparchus",
    date: "c. 190–120 BCE",
    history:
      "Often hailed as the 'Father of Trigonometry,' Hipparchus was the first to systematically develop trigonometric concepts. His work centered on the creation of a trigonometric table using chords in a circle — a concept closely related to the modern sine function. He used these tables to solve problems in spherical astronomy, such as predicting solar and lunar eclipses. By introducing a quantitative method to study the heavens, Hipparchus laid the groundwork for future advancements in both astronomy and mathematics.",
  },
  {
    name: "Claudius Ptolemy",
    date: "c. 100–170 CE",
    history:
      "Ptolemy expanded upon Hipparchus’s ideas in his seminal work Almagest, where he refined trigonometric tables and introduced methods for solving triangles. He employed chords extensively and provided a more accurate table of chords in a circle, which allowed astronomers to calculate planetary positions with greater precision. His work dominated astronomical and mathematical thinking for over a thousand years and played a crucial role in preserving Greek trigonometry through the Middle Ages.",
  },
  {
    name: "Aryabhata",
    date: "476–550 CE",
    history:
      "Aryabhata was a pioneering Indian mathematician and astronomer who redefined trigonometric concepts. He was among the first to use sine (jya) and cosine (kojya) in place of chords, revolutionizing how angles and distances were calculated. His treatise, the Aryabhatiya, presented sine tables with remarkable accuracy and laid the foundation for later Indian advancements in trigonometry. Aryabhata's ideas significantly influenced Islamic and European scholars through translated texts.",
  },
  {
    name: "Al-Battani",
    date: "c. 858–929 CE",
    history:
      "A key figure of the Islamic Golden Age, Al-Battani introduced the modern trigonometric functions we know today, such as sine, cosine, and tangent, and moved away from the chord-based system of the Greeks. His work, especially the Zij al-Sabi, included accurate solar and lunar models, and he computed values for these functions more precisely than his predecessors. His influence reached far into medieval Europe and shaped Renaissance astronomy.",
  },
  {
    name: "Nasir al-Din al-Tusi",
    date: "1201–1274 CE",
    history:
      "Al-Tusi made significant strides in spherical trigonometry, which is essential for celestial navigation and astronomy. He was the first to treat trigonometry as an independent mathematical discipline, separate from astronomy. His book Treatise on the Quadrilateral presented the laws of sines and cosines for spherical triangles and established many principles still used in modern trigonometry. His rigorous, axiomatic approach laid the groundwork for later European formalizations.",
  },
  {
    name: "Regiomontanus",
    date: "1436–1476 CE",
    history:
      "A Renaissance mathematician and astronomer, Regiomontanus revived and extended Greek and Islamic trigonometry in Europe. He translated and compiled classical works, and in his book De Triangulis Omnimodis ('On Triangles of Every Kind'), he defined trigonometry as a separate branch of mathematics for the first time in Europe. His work played a crucial role in spreading trigonometric knowledge in the West and influenced Copernicus and others during the Scientific Revolution.",
  },
];
