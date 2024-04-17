import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export function GET() {
    const directoryPath = path.join('public', 'lables_jpeg');
    const files = fs.readdirSync(directoryPath);
    return NextResponse.json(files);
}