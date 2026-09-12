'use server';

import statusData from '@/data/client-status.json';

export async function getClientStatus(civilId: string) {
  const normalizedId = civilId.trim();
  if (!/^[0-9X]{8,12}$/i.test(normalizedId)) return null;
  const client = statusData.clients.find((entry) => entry.civilId === normalizedId);
  if (!client) return null;
  return {
    name: client.name,
    tier: client.tier,
    residency: client.residency,
    status: client.status,
    lastUpdated: client.lastUpdated,
    timeline: client.timeline
  };
}
