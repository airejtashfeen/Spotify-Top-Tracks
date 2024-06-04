//This token gets updated every once in a while and can be taken from developer.spotify.com for your specific account

const token = 'BQDQVK8khgiFKJGBZFR6Ym9dbnT_aP7WG10AvXRYQitc5vdtzwXv8XN1s0HsKi6ZVbWkmzE5d-37b17kfi3X0T4llozgM3eabhd2pK_X6JjlEMp08uqSV_3JMlkGFCfVgko4uhRi_rsLutgCTkMy34koiSzPOgBep_7q-0rM85Aj91JnVkfXibyX6bgUpcz1u2gWp8WrLd6aE1ZBNFZYp0AkpgQTdxi2frF_-n0lDhDSK6jL8i5N-f6j0VK1aLRDz36pFQa8iP9ONHIkl3Rv_6sM';

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch data from Spotify API: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

async function getTopTracks() {
  try {
    const response = await fetchWebApi(
      'v1/me/top/tracks?time_range=long_term&limit=10', 'GET'
    );
    if (!response.items || response.items.length === 0) {
      throw new Error('No top tracks found.');
    }
    return response.items;
  } catch (error) {
    console.error('Error fetching top tracks:', error.message);
    throw error;
  }
}

async function main() {
  try {
    const topTracks = await getTopTracks();
    const tracksList = document.getElementById('tracks-list');
    topTracks.forEach(({ name, artists }) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="track-name">${name}</div>
        <div class="artist-names">by ${artists.map(artist => artist.name).join(', ')}</div>
      `;
      tracksList.appendChild(listItem);
    });
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main().catch(err => console.error(err));

