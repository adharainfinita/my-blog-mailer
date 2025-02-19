const baseUrl = import.meta.env.VITE_BASE_URL;

document.querySelector('button').addEventListener('click', async () => {
  const emailInput = document.querySelector('#email');
  const email = emailInput.value.trim();

  if (!email) {
      alert('Please enter a valid email.');
      return;
  }

  try {
      const response = await fetch(`${baseUrl}/subscribe`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: email,
              action: 'add',
          }),
      });

      if (!response.ok) {
          const errorText = await response.text();
          console.error('Error:', errorText);
          alert('Failed to subscribe. Please try again.');
      } else {
          alert('Successfully subscribed!');
          emailInput.value = ''; // Limpia el campo de entrada
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
  }
});
