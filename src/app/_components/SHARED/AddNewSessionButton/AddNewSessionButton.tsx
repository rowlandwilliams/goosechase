'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';

export const AddNewSessionButton = () => {
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        // Generate UUID only after the component has mounted on the client
        setSessionId(crypto.randomUUID());
    }, []);

    return (
        sessionId && (
            <Link href={{ pathname: '/add-new', query: { id: sessionId } }}>
                <Button>
                    <span className="text-lg">+</span> Add Surf
                </Button>
            </Link>
        )
    );
};
