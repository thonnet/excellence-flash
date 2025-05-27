
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { ImportData, SupportedFormat } from '../types/import';

export const getSupportedFormats = (): string[] => {
  return ['.json', '.csv', '.xlsx', '.xls', '.md'];
};

export const getFileFormat = (file: File): SupportedFormat | null => {
  const extension = file.name.toLowerCase().split('.').pop();
  switch (extension) {
    case 'json':
      return 'json';
    case 'csv':
      return 'csv';
    case 'xlsx':
    case 'xls':
      return 'xlsx';
    case 'md':
      return 'md';
    default:
      return null;
  }
};

export const getFileFormatLabel = (file: File): string => {
  const format = getFileFormat(file);
  switch (format) {
    case 'json': return 'JSON';
    case 'csv': return 'CSV';
    case 'xlsx': return 'Excel';
    case 'md': return 'Markdown';
    default: return 'Inconnu';
  }
};

export const parseCSV = (content: string): Promise<ImportData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data as any[];
          
          if (!data.length) {
            resolve({ excellences: [], experiences: [] });
            return;
          }

          const firstRow = data[0];
          
          if ('name' in firstRow && 'category' in firstRow) {
            const excellences = data.map(row => ({
              name: row.name || '',
              description: row.description || '',
              category: row.category || 'manifestee'
            }));
            resolve({ excellences });
          } else if ('title' in firstRow && 'excellence_id' in firstRow) {
            const experiences = data.map(row => ({
              excellence_id: row.excellence_id || '',
              title: row.title || '',
              description: row.description || '',
              date_experienced: row.date_experienced || new Date().toISOString().split('T')[0],
              tags: row.tags ? row.tags.split(',').map((tag: string) => tag.trim()) : [],
              image_url: row.image_url || null,
              image_caption: row.image_caption || null
            }));
            resolve({ experiences });
          } else {
            reject(new Error('Format CSV non reconnu. Assurez-vous d\'avoir les bonnes colonnes.'));
          }
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(new Error(`Erreur lors du parsing CSV: ${error.message}`));
      }
    });
  });
};

export const parseExcel = (file: File): Promise<ImportData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        let excellences: any[] = [];
        let experiences: any[] = [];

        if (workbook.SheetNames.includes('excellences')) {
          const excellencesSheet = workbook.Sheets['excellences'];
          const excellencesData = XLSX.utils.sheet_to_json(excellencesSheet);
          excellences = excellencesData.map((row: any) => ({
            name: row.name || '',
            description: row.description || '',
            category: row.category || 'manifestee'
          }));
        }

        if (workbook.SheetNames.includes('experiences')) {
          const experiencesSheet = workbook.Sheets['experiences'];
          const experiencesData = XLSX.utils.sheet_to_json(experiencesSheet);
          experiences = experiencesData.map((row: any) => ({
            excellence_id: row.excellence_id || '',
            title: row.title || '',
            description: row.description || '',
            date_experienced: row.date_experienced || new Date().toISOString().split('T')[0],
            tags: row.tags ? row.tags.split(',').map((tag: string) => tag.trim()) : [],
            image_url: row.image_url || null,
            image_caption: row.image_caption || null
          }));
        }

        if (excellences.length === 0 && experiences.length === 0 && workbook.SheetNames.length > 0) {
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const firstSheetData = XLSX.utils.sheet_to_json(firstSheet);
          
          if (firstSheetData.length > 0) {
            const firstRow = firstSheetData[0] as any;
            if ('name' in firstRow && 'category' in firstRow) {
              excellences = firstSheetData.map((row: any) => ({
                name: row.name || '',
                description: row.description || '',
                category: row.category || 'manifestee'
              }));
            }
          }
        }

        resolve({ excellences, experiences });
      } catch (error) {
        reject(new Error(`Erreur lors du parsing Excel: ${error instanceof Error ? error.message : 'Erreur inconnue'}`));
      }
    };
    reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier Excel'));
    reader.readAsArrayBuffer(file);
  });
};

export const parseMarkdown = (content: string): ImportData => {
  const lines = content.split('\n');
  const excellences: any[] = [];
  const experiences: any[] = [];

  let currentSection = '';
  let currentItem: any = {};

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('# ')) {
      currentSection = trimmedLine.substring(2).toLowerCase();
      continue;
    }

    if (trimmedLine.startsWith('## ')) {
      if (Object.keys(currentItem).length > 0) {
        if (currentSection.includes('excellence')) {
          excellences.push(currentItem);
        } else if (currentSection.includes('experience')) {
          experiences.push(currentItem);
        }
      }
      currentItem = { name: trimmedLine.substring(3), title: trimmedLine.substring(3) };
      continue;
    }

    if (trimmedLine.startsWith('**Description:**')) {
      currentItem.description = trimmedLine.substring(16).trim();
    } else if (trimmedLine.startsWith('**Catégorie:**')) {
      currentItem.category = trimmedLine.substring(14).trim();
    } else if (trimmedLine.startsWith('**Date:**')) {
      currentItem.date_experienced = trimmedLine.substring(9).trim();
    } else if (trimmedLine.startsWith('**Tags:**')) {
      const tagsStr = trimmedLine.substring(9).trim();
      currentItem.tags = tagsStr.split(',').map(tag => tag.trim());
    }
  }

  if (Object.keys(currentItem).length > 0) {
    if (currentSection.includes('excellence')) {
      excellences.push(currentItem);
    } else if (currentSection.includes('experience')) {
      experiences.push(currentItem);
    }
  }

  return { excellences, experiences };
};

export const parseFileContent = async (file: File): Promise<ImportData> => {
  const format = getFileFormat(file);
  
  switch (format) {
    case 'json':
      const jsonContent = await file.text();
      return JSON.parse(jsonContent);
    
    case 'csv':
      const csvContent = await file.text();
      return await parseCSV(csvContent);
    
    case 'xlsx':
      return await parseExcel(file);
    
    case 'md':
      const mdContent = await file.text();
      return parseMarkdown(mdContent);
    
    default:
      throw new Error('Format de fichier non supporté');
  }
};

export const validateData = (data: any): data is ImportData => {
  if (!data || typeof data !== 'object') return false;
  
  if (data.excellences && !Array.isArray(data.excellences)) return false;
  if (data.experiences && !Array.isArray(data.experiences)) return false;
  
  return true;
};
