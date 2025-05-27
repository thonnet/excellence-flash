
import { supabase } from '../integrations/supabase/client';
import { ImportData } from '../types/import';

export const importDataToSupabase = async (data: ImportData, userId: string) => {
  let importedExcellences = 0;
  let importedExperiences = 0;

  // Import excellences
  if (data.excellences && data.excellences.length > 0) {
    const excellencesToImport = data.excellences.map((excellence: any) => ({
      user_id: userId,
      name: excellence.name,
      description: excellence.description || '',
      category: excellence.category
    }));

    const { error: excellencesError } = await supabase
      .from('excellences')
      .insert(excellencesToImport);

    if (excellencesError) {
      throw new Error(`Erreur lors de l'importation des excellences: ${excellencesError.message}`);
    }

    importedExcellences = excellencesToImport.length;
  }

  // Import experiences
  if (data.experiences && data.experiences.length > 0) {
    const experiencesToImport = data.experiences.map((experience: any) => ({
      user_id: userId,
      excellence_id: experience.excellence_id,
      title: experience.title,
      description: experience.description || '',
      date_experienced: experience.date_experienced,
      tags: experience.tags || [],
      image_url: experience.image_url || null,
      image_caption: experience.image_caption || null
    }));

    const { error: experiencesError } = await supabase
      .from('experiences')
      .insert(experiencesToImport);

    if (experiencesError) {
      throw new Error(`Erreur lors de l'importation des expériences: ${experiencesError.message}`);
    }

    importedExperiences = experiencesToImport.length;
  }

  return { importedExcellences, importedExperiences };
};
