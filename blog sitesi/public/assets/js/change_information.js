getMaxPage();
  






  async function getMaxPage() {
    try {
      const response = await fetch('http://localhost:8000/homepage/maxpage');
  
      if (!response.ok) {
        throw new Error('HTTP hatası! status: ' + response.status);
      }
  
      const maxpage = await response.json();
      console.log(maxpage);
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  }