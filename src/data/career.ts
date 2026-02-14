export interface CareerNode {
    date: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string[];
    tech: string[];
    logo?: string; // Placeholder for now
}

export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    category: 'systems' | 'virtualization' | 'cloud' | 'infrastructure';
}

export const WORK_EXPERIENCE: CareerNode[] = [
    {
        date: "Sep 2024 - Present",
        title: "Site Reliability Engineer",
        company: "One2N",
        location: "Pune, Maharashtra, India",
        type: "Full-time",
        description: [
            "Led data center migration projects with minimal downtime during market hours.",
            "Implemented Infrastructure as Code (IaC) practices using Nutanix REST APIs.",
            "Automated VM and storage provisioning workflows, enabling self-serve capabilities.",
            "Decommissioned legacy infrastructure, ensuring smooth transitions to virtualized platforms."
        ],
        tech: ["Nutanix", "VMware", "Python", "LogicMonitor", "Prometheus", "Grafana", "Cohesity"],
    },
    {
        date: "Oct 2021 - Jun 2024",
        title: "Infrastructure Engineer",
        company: "IG Group",
        location: "Bengaluru, Karnataka, India",
        type: "Full-time",
        description: [
            "Managed 5 data centers, 800 hypervisors, 70+ clustered workloads and 15,000+ VMs.",
            "Designed and built compute and storage infrastructure with 99.99% SLA.",
            "Implemented Prometheus, Grafana and LogicMonitor, reducing alert noise by 90%.",
            "Executed annual upgrades for 800+ hypervisors, reducing timelines by 50%.",
            "Saved £100,000+ by decommissioning legacy systems.",
            "Developed 6 automated processes to reduce delivery time from days to hours."
        ],
        tech: ["Distributed Systems", "VMware", "Grafana", "Prometheus", "LogicMonitor", "Automation"],
    },
    {
        date: "Mar 2021 - Jun 2021",
        title: "Site Reliability Engineer (Intern)",
        company: "PhonePe",
        location: "Bengaluru, Karnataka, India",
        type: "Internship",
        description: [
            "Setup monitoring stack for AerospikeDB (KV store) as PoC.",
            "Implemented Infrastructure as Code using SaltStack.",
            "Configured Prometheus Exporter, Service-Discovery, and Alert Manager.",
            "Implemented end-to-end TLS encryption for secure metric transport."
        ],
        tech: ["Flask", "RabbitMQ", "ElasticSearch", "SaltStack", "Aerospike", "OpenSSL"],
    },
    {
        date: "Jun 2019 - Jul 2019",
        title: "Project Intern",
        company: "DRDO (GTRE)",
        location: "Bengaluru, Karnataka, India",
        type: "Internship",
        description: [
            "Implemented Low and High-level Networking concepts and Routing Techniques.",
            "Studied DRONA (DRDO Rapid Online Network Access) implementation.",
            "Briefed on Safety-Critical Systems (IV&V testing) and MISRA C Guidelines."
        ],
        tech: ["Networking", "Virtualization", "RAID", "Unix Administration"],
    }
];

// Timeline of "When I got into..."
export const TECH_TIMELINE: TimelineEvent[] = [
    {
        year: "2019",
        title: "Systems Initiation",
        category: "systems",
        description: "First exposure to high-level networking and data center ops at DRDO."
    },
    {
        year: "2021",
        title: "Virtualization & IaC",
        category: "virtualization",
        description: "Deep dive into Hypervisors (PhonePe) and Config Management (SaltStack)."
    },
    {
        year: "2022",
        title: "Scale & Infrastructure",
        category: "infrastructure",
        description: "Managing 15,000+ VMs and 5 Data Centers at IG Group."
    },
    {
        year: "2024",
        title: "Cloud & Reliability",
        category: "cloud",
        description: "Advanced SRE, Nutanix Automation, and Hybrid Cloud architectures at One2N."
    }
];
