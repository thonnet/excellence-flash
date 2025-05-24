
import { Excellence, Experience } from '../types';

// Fonction pour télécharger un fichier
const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export CSV
export const exportToCSV = (excellences: Excellence[], experiences: Experience[]) => {
  // CSV des excellences
  const excellencesCSV = [
    'id,user_id,name,description,category,created_at,updated_at',
    ...excellences.map(exc => 
      `"${exc.id}","${exc.user_id}","${exc.name}","${exc.description}","${exc.category}","${exc.created_at}","${exc.updated_at}"`
    )
  ].join('\n');

  // CSV des expériences avec référence à l'excellence
  const experiencesCSV = [
    'id,user_id,excellence_id,excellence_name,title,description,image_url,image_caption,date_experienced,tags,created_at,updated_at',
    ...experiences.map(exp => {
      const excellence = excellences.find(exc => exc.id === exp.excellence_id);
      const excellenceName = excellence ? excellence.name : '';
      return `"${exp.id}","${exp.user_id}","${exp.excellence_id}","${excellenceName}","${exp.title}","${exp.description}","${exp.image_url || ''}","${exp.image_caption || ''}","${exp.date_experienced}","${exp.tags.join(';')}","${exp.created_at}","${exp.updated_at}"`;
    })
  ].join('\n');

  // Créer un fichier combiné
  const combinedCSV = `# EXCELLENCES\n${excellencesCSV}\n\n# EXPERIENCES\n${experiencesCSV}`;
  
  const timestamp = new Date().toISOString().split('T')[0];
  downloadFile(combinedCSV, `excellence-flash-data-${timestamp}.csv`, 'text/csv');
};

// Export Markdown
export const exportToMarkdown = (excellences: Excellence[], experiences: Experience[]) => {
  let markdown = '# Excellence Flash - Export des données\n\n';
  
  // Export par catégorie d'excellence
  const categories = {
    manifestee: 'Excellence manifestée',
    principe: 'Principe d\'excellence',
    quete: 'Quête d\'excellence'
  } as const;

  Object.entries(categories).forEach(([categoryKey, categoryTitle]) => {
    const categoryExcellences = excellences.filter(exc => exc.category === categoryKey);
    
    if (categoryExcellences.length > 0) {
      markdown += `## ${categoryTitle}\n\n`;
      
      categoryExcellences.forEach(excellence => {
        markdown += `### ${excellence.name}\n\n`;
        markdown += `${excellence.description}\n\n`;
        
        // Expériences associées
        const relatedExperiences = experiences.filter(exp => exp.excellence_id === excellence.id);
        
        if (relatedExperiences.length > 0) {
          markdown += `#### Expériences (${relatedExperiences.length})\n\n`;
          
          relatedExperiences.forEach(exp => {
            markdown += `**${exp.title}** _(${new Date(exp.date_experienced).toLocaleDateString('fr-FR')})_\n\n`;
            markdown += `${exp.description}\n\n`;
            
            if (exp.image_caption) {
              markdown += `_${exp.image_caption}_\n\n`;
            }
            
            if (exp.tags.length > 0) {
              markdown += `Tags: ${exp.tags.map(tag => `\`${tag}\``).join(', ')}\n\n`;
            }
            
            markdown += '---\n\n';
          });
        } else {
          markdown += '_Aucune expérience documentée_\n\n';
        }
        
        markdown += '\n';
      });
    }
  });

  const timestamp = new Date().toISOString().split('T')[0];
  downloadFile(markdown, `excellence-flash-export-${timestamp}.md`, 'text/markdown');
};

// Import CSV
export const importFromCSV = async (file: File): Promise<{ excellences: Excellence[], experiences: Experience[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const sections = content.split('# EXPERIENCES');
        
        if (sections.length !== 2) {
          throw new Error('Format de fichier invalide');
        }

        // Parse excellences
        const excellencesSection = sections[0].replace('# EXCELLENCES\n', '');
        const excellenceLines = excellencesSection.trim().split('\n');
        const excellenceHeaders = excellenceLines[0].split(',');
        
        const excellences: Excellence[] = excellenceLines.slice(1).map(line => {
          const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
          const cleanValues = values.map(val => val.replace(/^"|"$/g, ''));
          
          return {
            id: cleanValues[0],
            user_id: cleanValues[1],
            name: cleanValues[2],
            description: cleanValues[3],
            category: cleanValues[4] as 'manifestee' | 'principe' | 'quete',
            created_at: cleanValues[5],
            updated_at: cleanValues[6]
          };
        });

        // Parse experiences
        const experiencesSection = sections[1].trim();
        const experienceLines = experiencesSection.split('\n');
        const experienceHeaders = experienceLines[0].split(',');
        
        const experiences: Experience[] = experienceLines.slice(1).map(line => {
          const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
          const cleanValues = values.map(val => val.replace(/^"|"$/g, ''));
          
          return {
            id: cleanValues[0],
            user_id: cleanValues[1],
            excellence_id: cleanValues[2],
            title: cleanValues[4],
            description: cleanValues[5],
            image_url: cleanValues[6] || undefined,
            image_caption: cleanValues[7] || undefined,
            date_experienced: cleanValues[8],
            tags: cleanValues[9] ? cleanValues[9].split(';') : [],
            created_at: cleanValues[10],
            updated_at: cleanValues[11]
          };
        });

        resolve({ excellences, experiences });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
    reader.readAsText(file);
  });
};
