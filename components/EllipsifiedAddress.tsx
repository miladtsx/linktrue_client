import React from 'react';
import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ellipsify, copyToClipboard } from '../lib/utils'

const EllipsifiedAddress = ({ walletAddress }: { walletAddress: string }) => {


    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        //    className="text-blue-500 underline hover:text-blue-700 no-underline"

                        onClick={() => {
                            copyToClipboard(walletAddress)

                            toast.info("Copied to clipboard", {
                                description: "Paste it wherever you like.",
                                duration: 5000,
                            })
                        }
                        }
                    >
                        <span>
                            {ellipsify(walletAddress)} {" "} <i className="fas fa-copy"></i>
                        </span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{walletAddress}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>


        // <span>
        //     <button

        //     >

        //     </button>
        // </span>
    );
};

export default EllipsifiedAddress;