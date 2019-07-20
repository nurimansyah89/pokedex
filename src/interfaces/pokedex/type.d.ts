export interface IPokemonType {
  name: string;
  damage_relations?: {
    double_damage_from: Array<{ name: string }>;
    double_damage_to: Array<{ name: string }>;
    half_damage_from: Array<{ name: string }>;
    no_damage_from: Array<{ name: string }>;
    no_damage_to: Array<{ name: string }>;
  };
  pokemon?: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}
