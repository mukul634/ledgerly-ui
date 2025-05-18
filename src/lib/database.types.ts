
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          companyName: string
          district: string
          phoneNo: string
          mobileNo?: string
          panNo?: string
          address?: string
          clientStatus: 'Active' | 'Pending' | 'Inactive'
          dueAmount: number
          renewalDate: string
          productsUsed?: string
          fullName?: string
          representative?: string
          agentName?: string
          installDate?: string
          startDate?: string
          remarks?: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'created_at'> & { created_at?: string }
        Update: Partial<Database['public']['Tables']['clients']['Insert']>
      }
      transactions: {
        Row: {
          id: string
          recordNo: string
          clientId: string
          transactionType: 'Payment' | 'Renewal' | 'New Registration'
          amount: number
          details: string
          paymentMethod: 'cash' | 'check' | 'online' | string
          agentName?: string
          date: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'created_at'> & { created_at?: string }
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}
