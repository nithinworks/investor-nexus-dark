
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init(): Promise<any[]>;
      destroy(): void;
      addScene(config: {
        elementId: string;
        fps?: number;
        scale?: number;
        dpi?: number;
        projectId: string;
        lazyLoad?: boolean;
        filePath?: string;
        fixed?: boolean;
        altText?: string;
        ariaLabel?: string;
        production?: boolean;
        interactivity?: {
          mouse?: {
            disableMobile?: boolean;
          };
        };
      }): Promise<{
        destroy(): void;
        resize(): void;
        paused: boolean;
      }>;
    };
  }
}

export {};
