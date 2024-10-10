import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private supabase: SupabaseClient | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.supabase = createClient(
        environment.supabaseConfig.url,
        environment.supabaseConfig.apikey
      );
    }
  }

  async uploadFile(file:File, fileName:string, folderName:string = 'base', bucket:string){
    const { error } = await this.supabase!.storage.from(bucket).upload(`${folderName}/${fileName}`, file);
    if(error){
      throw error;
    }
    const { data } = this.supabase!.storage.from(bucket).getPublicUrl(`${folderName}/${fileName}`)
    return data.publicUrl;
  }

}