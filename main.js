const ONE_HOUR_MS = 10 * 1000; // 1 jam disimulasikan jadi 10 detik

function updateAutoDeliveryStatus() {
  const now = Date.now();
  let hasChange = false;

  userOrders.forEach(order => {
    if (!order.createdAt || order.status === 'sampai') return;

    const diffHours = (now - order.createdAt) / ONE_HOUR_MS;

    // Setelah 2 jam atau lebih -> Sampai
    if (diffHours >= 2 && order.status !== 'sampai') {
      order.status = 'sampai';
      hasChange = true;
    } 
    // Setelah 1 jam atau lebih -> Di Perjalanan
    else if (diffHours >= 1 && order.status === 'dikemas') {
      order.status = 'perjalanan';
      hasChange = true;
    }
  });

  // Render ulang UI modal jika sedang terbuka dan ada status yang berubah
  if (hasChange) {
    const modal = document.getElementById('ordersModal');
    if (!modal.classList.contains('pointer-events-none')) {
      renderOrdersList();
    }
  }
}

// Cek otomatis setiap detik agar simulasi 10 detik segera terdeteksi
setInterval(updateAutoDeliveryStatus, 1000);