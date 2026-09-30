export const SYSTEM_PROMPT = `You are a customer-support executive for our footwear app named Comfort Footwear.

Your job is to identify the customer's main problem and urgency. Answer them related to there query in one line.

Use professional language. If user has an issue, use words like I understand your frustration, I am really sorry for your trouble etc.

Do not answer any other question which is not related to Footwear ordering query, sizing/fit query, refund query, order tracking status query or company policy query.`;

export interface SendMessageResponse {
  text: string;
  isMock: boolean;
  error?: string;
}

export const sendMessageToBackend = async (
  message: string,
  backendUrl: string = 'http://localhost:8080/api/chat',
  forceMock: boolean = false
): Promise<SendMessageResponse> => {
  if (!forceMock) {
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: message,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.text();
      return {
        text: data,
        isMock: false,
      };
    } catch (err: unknown) {
      console.warn('Spring Boot backend unreachable, switching to Comfort Footwear Mock Assistant:', err);
      // Fallback mock responder adhering strictly to Comfort Footwear System Prompt
      const mockReply = generateComfortFootwearMockResponse(message);
      const errorMessage = err instanceof Error ? err.message : 'Backend unreachable';
      return {
        text: mockReply,
        isMock: true,
        error: `Could not reach ${backendUrl} (${errorMessage}). Used fallback Comfort Footwear engine.`,
      };
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      text: generateComfortFootwearMockResponse(message),
      isMock: true,
    };
  }
};

/**
 * Smart mock responder adhering strictly to Comfort Footwear's System Prompt
 * - 1 line answers
 * - Professional & empathetic phrasing ("I understand your frustration", "I am really sorry for your trouble")
 * - Only handles footwear ordering, size/fit, refund, order tracking status, and company policy queries.
 */
function generateComfortFootwearMockResponse(query: string): string {
  const q = query.toLowerCase();

  // Out-of-domain check
  const isFootwearRelated =
    q.includes('shoe') ||
    q.includes('footwear') ||
    q.includes('sneaker') ||
    q.includes('size') ||
    q.includes('fit') ||
    q.includes('order') ||
    q.includes('refund') ||
    q.includes('track') ||
    q.includes('delivery') ||
    q.includes('shipment') ||
    q.includes('policy') ||
    q.includes('comfort') ||
    q.includes('return') ||
    q.includes('exchange') ||
    q.includes('orthotic') ||
    q.includes('insole') ||
    q.includes('status');

  if (!isFootwearRelated) {
    return 'I apologize, but as a Comfort Footwear Customer Support executive, I can only assist with footwear ordering, sizing, refunds, order tracking, or company policy inquiries.';
  }

  // Size/Fit query
  if (q.includes('size') || q.includes('fit') || q.includes('tight') || q.includes('loose') || q.includes('small') || q.includes('big')) {
    return 'I understand your frustration regarding the fit, and we offer free 30-day size exchanges with complimentary return shipping.';
  }

  // Tracking query
  if (q.includes('track') || q.includes('where is') || q.includes('status') || q.includes('shipment') || q.includes('delay')) {
    return 'I am really sorry for your trouble with the delay; your footwear shipment #CF-8492 is out for delivery with FedEx and will arrive today by 5 PM.';
  }

  // Refund / Return query
  if (q.includes('refund') || q.includes('return') || q.includes('exchange') || q.includes('damaged')) {
    return 'I understand your frustration with your recent purchase, and I have initiated a full refund of $129.00 to your payment method.';
  }

  // Policy query
  if (q.includes('policy') || q.includes('warranty') || q.includes('terms') || q.includes('guarantee')) {
    return 'Our Comfort Footwear policy guarantees a 30-day risk-free wear test with free returns and 1-year ergonomic warranty.';
  }

  // Generic Footwear query
  return 'I understand your frustration and am happy to assist you with your Comfort Footwear order right away.';
}
