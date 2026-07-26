import html2canvas from 'html2canvas';

export async function exportElementAsPng(elementId: string, filename: string = 'my-bmi-result.png'): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Export element with ID "${elementId}" not found.`);
    return false;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false
    });

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Failed to generate PNG image:', err);
    return false;
  }
}

export function printBmiReport(elementId: string): void {
  if (typeof window === 'undefined') return;
  window.print();
}

export function generateShareUrl(params: {
  bmi?: number;
  heightCm?: number;
  weightKg?: number;
  unit?: string;
}): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.origin + window.location.pathname);
  if (params.bmi) url.searchParams.set('bmi', params.bmi.toString());
  if (params.heightCm) url.searchParams.set('h', params.heightCm.toString());
  if (params.weightKg) url.searchParams.set('w', params.weightKg.toString());
  if (params.unit) url.searchParams.set('u', params.unit);
  return url.toString();
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}
