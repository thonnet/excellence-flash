
import React from 'react';
import { HelpPage } from '../components/HelpPage';

interface HelpImportProps {
  onBack: () => void;
}

export const HelpImport: React.FC<HelpImportProps> = ({ onBack }) => {
  return (
    <HelpPage
      title="Guide d'importation de données"
      subtitle="Formats supportés et structure des données"
      onBack={onBack}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Formats de fichiers supportés
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            L'application supporte l'importation de données dans les formats suivants :
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6" style={{ color: 'var(--text-secondary)' }}>
            <li><strong>JSON</strong> (.json)</li>
            <li><strong>CSV</strong> (.csv)</li>
            <li><strong>Excel</strong> (.xlsx, .xls)</li>
            <li><strong>Markdown</strong> (.md)</li>
          </ul>
        </section>

        {/* Structure générale */}
        <section>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Structure générale des données
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Vos fichiers peuvent contenir deux types de données :
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6" style={{ color: 'var(--text-secondary)' }}>
            <li><strong>Excellences</strong> : vos compétences et domaines d'excellence</li>
            <li><strong>Expériences</strong> : les situations où vous avez appliqué vos excellences</li>
          </ul>
        </section>

        {/* Format JSON */}
        <section>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Format JSON
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Structure attendue pour un fichier JSON :
          </p>
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "excellences": [
    {
      "name": "Communication",
      "description": "Capacité à transmettre des idées clairement",
      "category": "manifestee"
    }
  ],
  "experiences": [
    {
      "excellence_id": "id-de-excellence",
      "title": "Présentation client réussie",
      "description": "Présentation qui a convaincu un client important",
      "date_experienced": "2024-01-15",
      "tags": ["présentation", "client"],
      "image_url": null,
      "image_caption": null
    }
  ]
}`}
            </pre>
          </div>
        </section>

        {/* Format CSV */}
        <section>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Format CSV
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Pour les fichiers CSV, créez un fichier séparé pour chaque type de données :
          </p>
          
          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            CSV pour les excellences
          </h3>
          <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>
            Colonnes requises (dans cet ordre) :
          </p>
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <pre className="text-green-400 text-sm">
name,description,category
Communication,Capacité à transmettre des idées clairement,manifestee
Leadership,Aptitude à guider et motiver une équipe,principe
            </pre>
          </div>

          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            CSV pour les expériences
          </h3>
          <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>
            Colonnes requises (dans cet ordre) :
          </p>
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <pre className="text-green-400 text-sm">
excellence_id,title,description,date_experienced,tags,image_url,image_caption
abc123,Présentation client,Présentation réussie,2024-01-15,"présentation,client",,
            </pre>
          </div>
        </section>

        {/* Format Excel */}
        <section>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Format Excel
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Pour les fichiers Excel, vous pouvez utiliser deux approches :
          </p>
          
          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Option 1 : Feuilles séparées
          </h3>
          <ul className="list-disc list-inside space-y-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
            <li>Créez une feuille nommée <strong>"excellences"</strong> avec les colonnes : name, description, category</li>
            <li>Créez une feuille nommée <strong>"experiences"</strong> avec les colonnes : excellence_id, title, description, date_experienced, tags, image_url, image_caption</li>
          </ul>

          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Option 2 : Une seule feuille
          </h3>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Si vous n'avez qu'une feuille, elle sera automatiquement interprétée comme contenant des excellences si elle a les colonnes name et category.
          </p>
        </section>

        {/* Format Markdown */}
        <section>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Format Markdown
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Structure attendue pour un fichier Markdown :
          </p>
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`# Excellences

## Communication
**Description:** Capacité à transmettre des idées clairement
**Catégorie:** manifestee

## Leadership
**Description:** Aptitude à guider et motiver une équipe
**Catégorie:** principe

# Experiences

## Présentation client réussie
**Description:** Présentation qui a convaincu un client important
**Date:** 2024-01-15
**Tags:** présentation, client`}
            </pre>
          </div>
        </section>

        {/* Catégories d'excellence */}
        <section>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Catégories d'excellence
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Les excellences doivent être classées dans l'une des trois catégories suivantes :
          </p>
          <div className="space-y-4">
            <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border-subtle)' }}>
              <h3 className="font-medium text-green-600">manifestee</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Excellence manifestée - Compétences que vous pratiquez naturellement
              </p>
            </div>
            <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border-subtle)' }}>
              <h3 className="font-medium text-blue-600">principe</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Principe d'excellence - Règles et méthodes qui optimisent vos performances
              </p>
            </div>
            <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border-subtle)' }}>
              <h3 className="font-medium text-orange-600">quete</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Quête d'excellence - Excellences que vous souhaitez développer
              </p>
            </div>
          </div>
        </section>

        {/* Champs optionnels */}
        <section>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Champs optionnels et obligatoires
          </h2>
          
          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Pour les excellences
          </h3>
          <ul className="list-disc list-inside space-y-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
            <li><strong>name</strong> (obligatoire) : Nom de l'excellence</li>
            <li><strong>category</strong> (obligatoire) : manifestee, principe, ou quete</li>
            <li><strong>description</strong> (optionnel) : Description détaillée</li>
          </ul>

          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Pour les expériences
          </h3>
          <ul className="list-disc list-inside space-y-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
            <li><strong>title</strong> (obligatoire) : Titre de l'expérience</li>
            <li><strong>excellence_id</strong> (obligatoire) : Identifiant de l'excellence liée</li>
            <li><strong>date_experienced</strong> (obligatoire) : Date au format YYYY-MM-DD</li>
            <li><strong>description</strong> (optionnel) : Description détaillée</li>
            <li><strong>tags</strong> (optionnel) : Mots-clés séparés par des virgules</li>
            <li><strong>image_url</strong> (optionnel) : URL d'une image</li>
            <li><strong>image_caption</strong> (optionnel) : Légende de l'image</li>
          </ul>
        </section>

        {/* Conseils */}
        <section>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Conseils pour une importation réussie
          </h2>
          <ul className="list-disc list-inside space-y-2" style={{ color: 'var(--text-secondary)' }}>
            <li>Assurez-vous que vos fichiers sont encodés en UTF-8</li>
            <li>Évitez les caractères spéciaux dans les noms de colonnes</li>
            <li>Pour les tags en CSV, séparez-les par des virgules sans espaces supplémentaires</li>
            <li>Les dates doivent être au format YYYY-MM-DD (ex: 2024-01-15)</li>
            <li>Testez avec un petit échantillon de données avant d'importer un gros fichier</li>
            <li>Vérifiez que les excellence_id dans vos expériences correspondent à des excellences existantes</li>
          </ul>
        </section>
      </div>
    </HelpPage>
  );
};
