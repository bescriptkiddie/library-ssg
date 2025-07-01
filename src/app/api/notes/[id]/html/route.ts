import { NextRequest, NextResponse } from 'next/server';
import { getNoteById } from '@/lib/notes';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const note = await getNoteById(id);

    if (!note || !note.htmlContent) {
      return new NextResponse('Note not found', { status: 404 });
    }

    // 返回原始HTML内容
    return new NextResponse(note.htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error serving HTML:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
