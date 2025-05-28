
import React from 'react';
import { 
  Diamond, DiamondsFour, Crown, Star, Trophy, Medal, Sparkle,
  MagnifyingGlass, Scan, Binoculars, Crosshair,
  Plus, X, CaretDown, List, Gear, User, Eye, PencilSimple, Trash, Link,
  FloppyDisk, FunnelSimple, SortAscending, Image, Info
} from 'phosphor-react';

const SelectPhosphorIcons: React.FC = () => {
  const excellenceIcons = [
    { name: 'Diamond', component: Diamond, import: 'Diamond' },
    { name: 'DiamondsFour', component: DiamondsFour, import: 'DiamondsFour' },
    { name: 'Crown', component: Crown, import: 'Crown' },
    { name: 'Star', component: Star, import: 'Star' },
    { name: 'Trophy', component: Trophy, import: 'Trophy' },
    { name: 'Medal', component: Medal, import: 'Medal' },
    { name: 'Sparkle', component: Sparkle, import: 'Sparkle' },
  ];

  const searchIcons = [
    { name: 'MagnifyingGlass', component: MagnifyingGlass, import: 'MagnifyingGlass' },
    { name: 'Scan', component: Scan, import: 'Scan' },
    { name: 'Binoculars', component: Binoculars, import: 'Binoculars' },
    { name: 'Crosshair', component: Crosshair, import: 'Crosshair' },
  ];

  const navigationIcons = [
    { name: 'Plus', component: Plus, import: 'Plus' },
    { name: 'X', component: X, import: 'X' },
    { name: 'CaretDown', component: CaretDown, import: 'CaretDown' },
    { name: 'List', component: List, import: 'List' },
    { name: 'Gear', component: Gear, import: 'Gear' },
    { name: 'User', component: User, import: 'User' },
    { name: 'Eye', component: Eye, import: 'Eye' },
    { name: 'PencilSimple', component: PencilSimple, import: 'PencilSimple' },
    { name: 'Trash', component: Trash, import: 'Trash' },
    { name: 'Link', component: Link, import: 'Link' },
  ];

  const actionIcons = [
    { name: 'FloppyDisk', component: FloppyDisk, import: 'FloppyDisk' },
    { name: 'FunnelSimple', component: FunnelSimple, import: 'FunnelSimple' },
    { name: 'SortAscending', component: SortAscending, import: 'SortAscending' },
    { name: 'Image', component: Image, import: 'Image' },
    { name: 'Info', component: Info, import: 'Info' },
  ];

  const IconGrid: React.FC<{ icons: typeof excellenceIcons, title: string }> = ({ icons, title }) => (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-[#0195ee]">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {icons.map(({ name, component: IconComponent, import: importName }) => (
          <div key={name} className="bg-[#2a2a2a] p-4 rounded-lg text-center">
            <div className="mb-3 flex justify-center">
              <IconComponent size={24} color="#ee5a01" />
            </div>
            <div className="text-sm font-medium text-white mb-2">{name}</div>
            <div className="text-xs text-gray-400 bg-[#1a1a1a] p-2 rounded font-mono">
              {`import { ${importName} } from 'phosphor-react';`}
            </div>
            <div className="text-xs text-gray-400 bg-[#1a1a1a] p-2 rounded font-mono mt-1">
              {`<${importName} size={24} color="#ee5a01" />`}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#ee5a01] mb-4">
            🎨 SÉLECTION PHOSPHOR ICONS
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Choisissez les meilleures icônes pour votre design system
          </p>
          <div className="bg-[#2a2a2a] p-4 rounded-lg inline-block">
            <div className="text-sm text-gray-400 mb-2">Installation :</div>
            <code className="text-[#0195ee] font-mono">npm install phosphor-react</code>
          </div>
        </header>

        <IconGrid icons={excellenceIcons} title="🏆 ICÔNES EXCELLENCE MENU" />
        <IconGrid icons={searchIcons} title="🔍 ICÔNES SEARCH" />
        <IconGrid icons={navigationIcons} title="🧭 ICÔNES NAVIGATION" />
        <IconGrid icons={actionIcons} title="⚡ ICÔNES ACTIONS" />

        <section className="mt-12 bg-[#2a2a2a] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-[#ee5a01] mb-4">
            📋 Instructions d'utilisation
          </h3>
          <div className="space-y-3 text-gray-300">
            <p><strong>1.</strong> Regardez chaque catégorie d'icônes</p>
            <p><strong>2.</strong> Identifiez celles qui correspondent le mieux à votre design</p>
            <p><strong>3.</strong> Copiez le code d'import affiché sous chaque icône</p>
            <p><strong>4.</strong> Remplacez vos icônes actuelles par les Phosphor sélectionnées</p>
          </div>
          
          <div className="mt-6 p-4 bg-[#1a1a1a] rounded">
            <div className="text-sm text-[#0195ee] font-bold mb-2">Exemple d'utilisation :</div>
            <pre className="text-sm text-gray-300 font-mono">
{`import { Diamond, MagnifyingGlass } from 'phosphor-react';

// Dans votre composant
<Diamond size={24} color="#ee5a01" />
<MagnifyingGlass size={16} color="#b0b0b0" />`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SelectPhosphorIcons;
