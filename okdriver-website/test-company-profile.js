// Simple test script to verify company profile API
const testCompanyProfile = async () => {
  try {
    console.log('🧪 Testing Company Profile API...');
    
    // Test the API endpoint
    const response = await fetch('http://localhost:5000/api/company/plan', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE' // Replace with actual token
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Response:', data);
      
      // Check if response has expected structure
      if (data.company && data.hasActivePlan !== undefined) {
        console.log('✅ API structure is correct');
        console.log('Company:', data.company.name);
        console.log('Has Active Plan:', data.hasActivePlan);
        if (data.activePlan) {
          console.log('Active Plan:', data.activePlan.name);
        }
      } else {
        console.log('❌ API structure is incorrect');
      }
    } else {
      console.log('❌ API Error:', response.status, await response.text());
    }
  } catch (error) {
    console.error('❌ Test Error:', error);
  }
};

// Run the test
testCompanyProfile();
